import React from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export default function GuideImage(props): JSX.Element {
  const smallSvgId = 'imageSmall' + getRandomInt(100000, 999999)
  const bigSvgId = 'imageBig' + getRandomInt(100000, 999999)
  const avatarId = getRandomInt(100000, 999999)

  if (!props.isSmall) {
    return (
      <svg className={props.svgStyle} width='308' height='309'>
        <path
          fill='#C4C4C4'
          d='M36 167.814L166.815 36.999 297.63 167.814 166.815 298.629z'
        />
        <g filter='url(#guide-avatar__filter0_d)'>
          <path
            fill='#2D2D2D'
            d='M33 168.35L167.35 34 301.7 168.35 167.35 302.7z'
          />
          <path
            stroke='#E6E2CF'
            d='M33.707 168.35L167.35 34.707 300.993 168.35 167.35 301.993z'
          />
        </g>
        <mask
          id='a'
          maskUnits='userSpaceOnUse'
          x='40'
          y='40'
          width='255'
          height='256'
        >
          <path
            transform='rotate(-45 40 168)'
            fill='#C4C4C4'
            d='M40 168h180v180H40z'
          />
        </mask>
        <g mask='url(#a)'>
          <path fill='url(#guide-avatar__pattern0)' d='M33 34h269v269H33z' />
        </g>
        <g filter='url(#guide-avatar__filter1_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M7.414 167.22l8.485-8.485 8.486 8.485-8.486 8.485z'
          />
        </g>
        <g filter='url(#guide-avatar__filter2_d)'>
          <path
            stroke='#E6E2CF'
            strokeWidth='2'
            d='M158.735 15.9l8.485-8.486 8.485 8.485-8.485 8.485z'
          />
        </g>
        <g filter='url(#guide-avatar__filter3_d)'>
          <path
            d='M24.385 158.735l134.35-134.35'
            stroke='#E6E2CF'
            strokeWidth='2'
          />
        </g>
        <defs>
          <filter
            id='guide-avatar__filter0_d'
            x='27'
            y='28'
            width='280.701'
            height='280.701'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
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
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter1_d'
            x='0'
            y='151.321'
            width='31.799'
            height='31.799'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
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
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter2_d'
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
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='guide-avatar__filter3_d'
            x='17.678'
            y='17.678'
            width='147.764'
            height='147.764'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
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
            <feColorMatrix values='0 0 0 0 0.901961 0 0 0 0 0.886275 0 0 0 0 0.811765 0 0 0 0.3 0' />
            <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <pattern
            id='guide-avatar__pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref={'#guide-avatar__image0' + bigSvgId}
              transform='scale(.00195)'
            />
          </pattern>
          <image
            id={'guide-avatar__image0' + bigSvgId}
            width='512'
            height='512'
            xlinkHref={
              props.image?.large?.url ??
              props.image?.medium?.url ??
              props.image?.small?.url ??
              props.image?.thumbnail?.url
            }
          />
        </defs>
      </svg>
    )
  } else {
    return (
      <svg
        className={props.svgStyle}
        width='153'
        height='153'
        viewBox='0 0 153 153'
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
            <use xlinkHref={'#' + smallSvgId} transform='scale(0.00390625)' />
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
          <feImage
            id={smallSvgId}
            // data-name={`${title} thumbnail`}
            width={256}
            height={256}
            xlinkHref={
              props.image?.large?.url ??
              props.image?.medium?.url ??
              props.image?.small?.url ??
              props.image?.thumbnail?.url
            }
          />
        </defs>
      </svg>
    )
  }
}
