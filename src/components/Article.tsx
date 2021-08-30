import Image from 'next/image'
import Link from 'next/link'
import SVG from 'react-inlinesvg'
import { AiOutlineUser } from 'react-icons/ai'
import { StrapiImageFormats } from '@models/types'
import format from 'date-fns/format'

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
      <a className='group'>
        <article className=''>
          <svg
            className='absolute transform -translate-x-42 -translate-y-10 invisible lg:visible'
            width='308'
            height='309'
            viewBox='0 0 308 309'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='guide-avatar'>
              <rect
                id='Rectangle 23'
                x='36'
                y='167.814'
                width='185'
                height='185'
                transform='rotate(-45 36 167.814)'
                fill='#C4C4C4'
              />
              <g id='Rectangle 24' filter='url(#filter0_d)'>
                <rect
                  x='33'
                  y='168.35'
                  width='190'
                  height='190'
                  transform='rotate(-45 33 168.35)'
                  fill='#2D2D2D'
                />
                <rect
                  x='33.7071'
                  y='168.35'
                  width='189'
                  height='189'
                  transform='rotate(-45 33.7071 168.35)'
                  stroke='#E6E2CF'
                />
              </g>
              <g id='Mask Group'>
                <mask
                  id='mask0'
                  mask-type='alpha'
                  maskUnits='userSpaceOnUse'
                  x='40'
                  y='40'
                  width='255'
                  height='256'
                >
                  <rect
                    id='Rectangle 21'
                    x='40'
                    y='168'
                    width='180'
                    height='180'
                    transform='rotate(-45 40 168)'
                    fill='#C4C4C4'
                  />
                </mask>
                <g mask='url(#mask0)'>
                  <rect
                    id='image 11'
                    x='33'
                    y='34'
                    width='269'
                    height='269'
                    fill='url(#pattern0)'
                  />
                </g>
              </g>
              <g id='Group 16'>
                <g id='Rectangle 25' filter='url(#filter1_d)'>
                  <rect
                    x='7.41414'
                    y='167.22'
                    width='12'
                    height='12'
                    transform='rotate(-45 7.41414 167.22)'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
                <g id='Rectangle 26' filter='url(#filter2_d)'>
                  <rect
                    x='158.735'
                    y='15.8995'
                    width='12'
                    height='12'
                    transform='rotate(-45 158.735 15.8995)'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
                <g id='Vector 6' filter='url(#filter3_d)'>
                  <path
                    d='M24.3847 158.735L158.735 24.3848'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
              </g>
            </g>
            <defs>
              <filter
                id='filter0_d'
                x='27'
                y='27.9998'
                width='280.701'
                height='280.701'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <pattern
                id='pattern0'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
              >
                <use xlinkHref='#image0' transform='scale(0.00195312)' />
              </pattern>
              <filter
                id='filter1_d'
                x='-7.62939e-05'
                y='151.321'
                width='31.799'
                height='31.799'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <filter
                id='filter2_d'
                x='151.321'
                y='0'
                width='31.799'
                height='31.799'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <filter
                id='filter3_d'
                x='17.6776'
                y='17.6777'
                width='147.764'
                height='147.764'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <image
                id='image0'
                data-name={`${title} thumbnail`}
                width='512'
                height='512'
                xlinkHref={
                  image?.large?.url ??
                  image?.medium?.url ??
                  image?.small?.url ??
                  image?.thumbnail?.url
                }
              />
            </defs>
          </svg>

          <svg
            className='absolute transform -translate-x-20 -translate-y-5 lg:invisible'
            width='153'
            height='153'
            viewBox='0 0 153 153'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='guide-avatar1'>
              <rect
                id='Rectangle 231'
                width='88.0658'
                height='88.0658'
                transform='matrix(0.708299 -0.705912 0.708299 0.705912 20.3052 82.8987)'
                fill='#C4C4C4'
              />
              <g id='Rectangle 241' filter='url(#filter0_d99)'>
                <rect
                  width='90.4459'
                  height='90.4459'
                  transform='matrix(0.708299 -0.705912 0.708299 0.705912 18.8744 83.1532)'
                  fill='#2D2D2D'
                />
                <rect
                  x='0.708299'
                  width='89.4459'
                  height='89.4459'
                  transform='matrix(0.708299 -0.705912 0.708299 0.705912 19.081 83.6532)'
                  stroke='#E6E2CF'
                />
              </g>
              <g id='Mask Group1'>
                <mask
                  id='mask999'
                  mask-type='alpha'
                  maskUnits='userSpaceOnUse'
                  x='22'
                  y='23'
                  width='121'
                  height='120'
                >
                  <rect
                    id='Rectangle 211'
                    width='85.2071'
                    height='85.2071'
                    transform='matrix(0.710035 -0.704167 0.710035 0.704167 22 83)'
                    fill='#C4C4C4'
                  />
                </mask>
                <g mask='url(#mask999)'>
                  <rect
                    id='image 111'
                    x='19'
                    y='19'
                    width='128'
                    height='128'
                    fill='url(#pattern999)'
                  />
                </g>
              </g>
              <g id='Group 161'>
                <g id='Rectangle 251' filter='url(#filter1_d99)'>
                  <rect
                    x='1.4166'
                    y='-5.96046e-08'
                    width='4.66444'
                    height='4.66444'
                    transform='matrix(0.708299 -0.705912 0.708299 0.705912 6.41322 83.6162)'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
                <g id='Rectangle 261' filter='url(#filter2_d99)'>
                  <rect
                    x='1.4166'
                    y='-5.96046e-08'
                    width='4.66444'
                    height='4.66444'
                    transform='matrix(0.708299 -0.705912 0.708299 0.705912 78.5683 11.7046)'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
                <g id='Vector 61' filter='url(#filter3_d99)'>
                  <path
                    d='M14.7665 78.5837L78.8293 14.7369'
                    stroke='#E6E2CF'
                    strokeWidth='2'
                  />
                </g>
              </g>
            </g>
            <defs>
              <filter
                id='filter0_d99'
                x='12.8744'
                y='13.3063'
                width='140.126'
                height='139.694'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <pattern
                id='pattern999'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
              >
                <use xlinkHref='#image99' transform='scale(0.00390625)' />
              </pattern>
              <filter
                id='filter1_d99'
                x='0'
                y='71.9117'
                width='21.4408'
                height='21.409'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <filter
                id='filter2_d99'
                x='72.155'
                y='0.00012207'
                width='21.4408'
                height='21.409'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <filter
                id='filter3_d99'
                x='8.05817'
                y='8.03101'
                width='77.4794'
                height='77.2587'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feMorphology
                  radius='1'
                  operator='dilate'
                  in='SourceAlpha'
                  result='effect1_dropShadow'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='2.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <image
                id='image99'
                data-name={`${title} thumbnail`}
                width='256'
                height='256'
                xlinkHref={
                  image?.large?.url ??
                  image?.medium?.url ??
                  image?.small?.url ??
                  image?.thumbnail?.url
                }
              />
            </defs>
          </svg>

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
