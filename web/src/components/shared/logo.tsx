import Image from 'next/image'

const Logo = () => {
  return (
    <h1 className="flex items-center gap-3 font-alt text-4xl">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={32}
        alt="Peça de quebra-cabeças"
      />
      To-do list
    </h1>
  )
}

export default Logo
