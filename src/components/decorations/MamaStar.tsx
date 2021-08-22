import mamaImg from '../../../public/ui/actor/ma001001_01_actor_icon.png'
import Image from 'next/image'

export default function MamaStar({...all}): JSX.Element {
    return <Image
        {...all}
        src={mamaImg}
        alt="Mama icon used as star"
    />
}