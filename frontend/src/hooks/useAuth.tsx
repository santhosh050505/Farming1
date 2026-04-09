const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // ✅ Insert into profiles table
  if (data.user && !error) {
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        email: data.user.email,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }
  }

  return { error: error as Error | null };
};
