import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useAuthContext } from '../components/auth';
import React from "react";
import ReactDOM from "react-dom";
import {useState,useEffect } from 'react'


export default function Home() {
  const {user} = useAuthContext()
  useEffect(() => {
    console.log(user)
  },[])
  return (
    <div>
      <Head>
        <title>Blogs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <h1>Blogs</h1>
        <div>
          <Link href="/login">
            <button className="button">Login | Register </button>
          </Link>
        </div>
    </div>
  )
}

