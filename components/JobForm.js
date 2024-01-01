import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
export default function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submitJob = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .insert([{ title: title, description: description }]);
    if (error) {
      console.error("Error submitting job:", error);
    } else {
      console.log("Job submitted successfully:", data);
      setTitle("");
      setDescription("");
    }
  };
  return (
    <div>
      <h2>Submit a Job</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
      />
      <button onClick={submitJob}>Submit Job</button>
    </div>
  );
}
