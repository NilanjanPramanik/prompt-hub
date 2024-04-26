"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const params = useParams();
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  
  useEffect(() => {
    
    getPromptDetails();
    
  }, [])
  
  const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${params.id}`);
      const data = await response.json();

      setPost({
          prompt: data.prompt,
          tag: data.tag,
      })
  }
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!params.id) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const deletePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${params.id}`, {
        method: 'DELETE'
      })

      if (response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally{
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        handleDelete={deletePrompt}
      />
    </div>
  );
};

export default EditPrompt;
