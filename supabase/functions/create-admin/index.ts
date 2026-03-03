import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const adminEmail = 'siatgroup.sws@gmail.com';
    const adminPassword = 'Razi@#1234';

    // Check if admin user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingAdmin = existingUsers?.users?.find(u => u.email === adminEmail);

    if (existingAdmin) {
      // Use service role client to bypass RLS and ensure role exists
      const { data: roleExists } = await supabaseAdmin
        .from('user_roles')
        .select('id')
        .eq('user_id', existingAdmin.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleExists) {
        const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
          user_id: existingAdmin.id,
          role: 'admin'
        });
        if (roleError) {
          console.error('Role insert error:', roleError);
          return new Response(JSON.stringify({ error: roleError.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response(JSON.stringify({ message: 'Admin already exists, role ensured', created: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create admin user
    const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Assign admin role using service role client (bypasses RLS)
    const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
      user_id: newUser.user.id,
      role: 'admin'
    });

    if (roleError) {
      console.error('Role insert error:', roleError);
      return new Response(JSON.stringify({ error: roleError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Admin created successfully', created: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
