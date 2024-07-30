import Image from 'next/image'

const EmptyList = () => {
  return (
    <div className="flex min-h-60 w-full flex-col items-center justify-center rounded-xl border-t-2 p-4 text-gray-300">
      <Image
        src="/icons/clipboard.svg"
        alt="Icone de prancheta"
        width={56}
        height={56}
        className="mb-4"
      />
      <span className="font-bold">Você ainda não tem tarefas cadastradas</span>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}

export default EmptyList
