import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { motion, Transition, Variants } from "framer-motion";

import { useScroll } from "@/components/useScroll";
import Slider from '@/components/Slider';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ref, controls] = useScroll();

  return (
    <>
      <Head>
        <title>Siemens - Juan</title>
        <meta name="description" content="Siemens - Juan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='bg-white py-32 px-6 lg:px-8' ref={ref as any}>
        <div
          className='mx-auto max-w-3xl text-base leading-7 text-gray-700'
        >
          <motion.div 
            initial="hidden"
            variants={headerAnimation}
            animate={controls as any}
          >
            <p className="text-base font-semibold leading-7 text-indigo-600">Juan Zapata Gomez</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Code Development Project</h1>
          </motion.div>

          <motion.div 
            initial="hidden"
            variants={sliderAnimation}
            animate={controls as any}
          >
            <Slider />
          </motion.div>
        </div>


      </main>
    </>
  )
}

const headerAnimation : Variants = {
  hidden : {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5
    }
  },
}

const sliderAnimation : Variants = {
  hidden : {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2.5
    }
  },
}