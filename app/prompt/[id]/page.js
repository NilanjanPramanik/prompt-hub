"use client"

import Form from '@components/Form'
import React, { useEffect } from 'react'

const PromptPage = () => {

    useEffect(()=> {
        // Check if the prompt is created by the logedin user
        // await fetch('/api/')


    }, [])

  return (
    <section>
        <Form type={"Create"} post={""}/>
    </section>
  )
}

export default PromptPage