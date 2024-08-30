import supabase from "@/supabase/supabase";

export async function GET() {
  return Response.json({ success: false, error: "Invaild method" });
}
export async function POST(req, res) {
  const { data } = await req.json();
  const urlID = data.urlID;
  let { data: list, error } = await supabase
    .from("urls")
    .select("*")
    .eq("urlID", urlID);

  if (error) {
    return Response.json({ success: false, error });
  } else if (list.length === 0) {
    return Response.json({ success: true, url: "not found" });
  } else {
    return Response.json({ success: true, url: list[0].url });
  }
}
