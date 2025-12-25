import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  // const { _, __ } = await supabase
  //   .from("bookings")
  //   .select("*, cabins(*), guests(*)")
  //   .eq("id", id)
  //   .single();
  // const {d, e} = await supabase.auth.getUserIdentities()

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avater: "",
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  //   console.log(data);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  //   console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();
  //   console.log(data);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullname
  let updateData;
  // if (password) updateData = { password };

  if (fullName) updateData = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // 2. Upload the avatar image
  const filename = `avater-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avaters")
    .upload(filename, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avater: `${supabaseUrl}/storage/v1/object/public/avaters/${filename}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUser;

  // https://iomzbbebknzjvfzmeocu.supabase.co/storage/v1/object/public/avaters/avater-3b881b1b-b970-4a08-a427-29cb7a1ccaa5-0.5951302565415126
}

export async function handlePasswordUpdate({
  currentPassword,
  newPassword,
  email,
}) {
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) throw new Error("Current password is not correct");

  console.log(data);

  // return updatedData;
  // 3. Update password
  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      password: newPassword,
    });

  if (updateError) throw updateError;

  return updatedData;
}
