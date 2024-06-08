import React from 'react'
import Animation from './Animation'




export default function Hero() {
  return (
    <section className='flex flex-wrap justify-center items-start min-h-screen bg-yellow-600'>
      <div className= 'relative h-full w-full absolute top-0 mt-100'>
        <p>hello</p>
        <Animation />
      </div>
    </section>
  )
}