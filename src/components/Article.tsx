import Image from 'next/image'
import Link from 'next/link'
import SVG from 'react-inlinesvg'
import { AiOutlineUser } from 'react-icons/ai'
import { StrapiImageFormats } from '@models/types'
import format from 'date-fns/format'
import GuideImage from './decorations/GuideImage'
import { ShadowRoot } from '@components/ShadowRoot'

interface ArticleProps {
  title: string
  excerpt: string
  author: string
  date: string
  slug: string
  image: StrapiImageFormats
}

export default function Article({
  title = 'Guide name',
  excerpt = 'Lorem ipsum dolor sit amet',
  author = 'author',
  date = '2021-08-28T00:51:14.244Z',
  slug = 'getting-started',
  image,
}: ArticleProps): JSX.Element {
  return (
    <Link href={`/guide/${slug}`} passHref={true}>
      <a className='group '>
        <article className='relative'>
          <ShadowRoot className='absolute transform -translate-x-44 -translate-y-10 invisible lg:visible'>
            <GuideImage
              image={image}
              title={title}
            />
          </ShadowRoot>

          <ShadowRoot className='absolute transform -translate-x-20 -translate-y-5 lg:invisible'>
            <GuideImage isSmall={true} image={image} title={title} />
          </ShadowRoot>

          <div className='flex items-center h-12 lg:h-20 bg-beige-inactive '>
            <h3 className='ml-20 mr-16 sm:ml-24 sm:mr-56 lg:mr-44 lg:ml-44 my-1 leading-4 text-black text-lg lg:text-3xl lg:leading-7 font-semibold line-clamp-2 overflow-hidden'>
              {title}
            </h3>
          </div>
          <div className='bg-grey-foreground h-20 lg:h-44'>
            <div className='relative ml-20 sm:ml-24 lg:ml-44 lg:pt-5 lg:pb-10 h-full'>
              <div className='flex flex-col justify-around lg:justify-between h-full max-w-lg'>
                <p className='hidden lg:block text-lg text-beige-active leading-tight'>
                  {excerpt}
                </p>

                <div className='relative flex items-start flex-col lg:flex-row lg:justify-between text-beige-inactive'>
                  <span className='flex text-sm gap-x-1 items-end'>
                    <AiOutlineUser size={24} />
                    {author}
                  </span>

                  <SVG className='my-1 lg:hidden' src='/decorations/hr.svg' />

                  <SVG
                    className='absolute mt-6 hidden lg:block'
                    src='/decorations/article-underline.svg'
                  />

                  <span className='text-sm text-beige-inactive'>
                    {format(new Date(date), 'PP')}
                  </span>
                </div>
              </div>

              <SVG
                className='absolute right-8 lg:right-20 top-1/2 transform -translate-y-1/2 h-6 transition-transform ease-out-cubic lg:h-12 group-hover:translate-x-1 lg:group-hover:translate-x-6'
                src='/decorations/arrow.svg'
              />
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}
