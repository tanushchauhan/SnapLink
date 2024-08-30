import supabase from "@/supabase/supabase";

export async function GET() {
  return Response.json({ success: false, error: "Invaild method" });
}
export async function POST(req, res) {
  const { data } = await req.json();
  const urlID = data.urlID;
  const url = data.url;
  const { error } = await supabase.from("urls").insert([{ urlID, url }]);
  if (error) {
    return Response.json({ success: false, error });
  } else {
    return Response.json({ success: true });
  }
}
