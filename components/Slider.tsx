import { useScroll } from "@/components/useScroll";
import {classNames} from '@/utils/classNames';
import { useEffect, useState } from "react";

import useSWR from 'swr'

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())


function Slider() {
  const [ref, controls] = useScroll();

  const { data, error } : {data: TemplateType[], error : any} = useSWR('/api/data', fetcher)
  const [index, setIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState<TemplateType[]>([])

  useEffect(() => {
    if (!data) {
      return
    }

    setThumbnails(data.slice(0, 4))
  }, [data])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const updateCounter = (val: 1 | -1) => {
    if (val === 1) {
      if (index < data.length - 1) {
        const newIndex = index + 1

        // Update index
        setIndex(newIndex)

        // Update thumbnail
        if (newIndex > 3) {
          setThumbnails(data.slice(newIndex - 3, newIndex + 1))
        }
      }


    } else {
      if (index > 0) {
        const newIndex = index - 1

        // Update index
        setIndex(newIndex)

        // Update thumbnail
        if (data.length - newIndex > 4) {
          setThumbnails(data.slice(newIndex, newIndex + 4))
        }
      }
    }
  }

  return (
    <>
      <div ref={ref as any} className='relative w-full'>
        {/* Render Image */}
        <div className='relative h-56 overflow-hidden rounded-lg md:h-96 mt-16'>
          <div className='absolute h-full w-full p-1 rounded-lg bg-gradient-to-tr from-amber-500 to-fuchsia-700'>
            {
              data.map((o, arrIndex) => (
                <div key={o.id} className={classNames(
                  arrIndex === index ? '' : 'hidden',
                  'w-full h-full'
                )}>
                  <img
                    src={`/${o.image}`}
                    className='block rounded-lg w-full h-full'
                  />
                </div>
              ))
            }
          </div>

        </div>

        {/* Render Previous Button */}
        <div
          className='absolute top-0 left-0 z-30 flex items-center justify-center h-full'
        >
          <button
            type='button'
            disabled={index === 0 ? true : false}
            className={classNames(
              index === 0 ? 'cursor-not-allowed disabled' : 'cursor-pointer',
              'px-4 group focus:outline-none'
            )}
            onClick={() => updateCounter(-1)}
          >
            <span
              className='inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'
            >
                <svg aria-hidden="true" className='w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="sr-only">Previous</span>
            </span>
          </button>
        </div>


        {/* Render Next Button */}
        <div
          className='absolute top-0 right-0 z-30 flex items-center justify-center h-full'
        >
          <button
            type="button"
            disabled={index === data.length - 1 ? true : false}
            className={classNames(
              index === data.length - 1 ? 'cursor-not-allowed disabled' : 'cursor-pointer',
              'px-4 cursor-pointer group focus:outline-none'
            )}
            onClick={() => updateCounter(1)}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="sr-only">Next</span>
            </span>
          </button>
        </div>

      </div>

      {/* Render Thumbnails */}
      <div
        className="grid grid-cols-4 gap-1 mt-4"
      >
        {
          thumbnails.map((t, tIndex) => (
            <div key={t.thumbnail} className="rounded-lg">
              <div className={classNames(
              data[index].id === t.id ? 'bg-gradient-to-tr from-amber-500 to-fuchsia-700' : '',
              "h-full w-full p-1 rounded-lg"
            )}>
                <img  src={`/${t.thumbnail}`} alt={t.title} className="w-full h-full rounded-lg" />
              </div>
            </div>
          ))
        }
      </div>

      {/* Render Description */}
      <div>
      <p className="mt-8 text-xl font-semibold sm:text-2xl text-gray-900">{data[index].title}</p>
      <p className="text-base leading-7 text-gray-700">{data[index].description}</p>

      </div>
    </>

  )
}

type TemplateType = {
  title: string
  cost: string
  id: string
  description: string
  thumbnail: string
  image: string
}

export default Slider
