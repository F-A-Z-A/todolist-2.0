import { ChangeEvent, useState } from "react"

type Props = {
  value: string
  onChange: (title: string) => void
  className?: string | undefined
}
export const EditableSpan = ({ value, className, onChange }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    onChange(title)
    setIsEditMode(false)
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <>
      {isEditMode ? (
        <input value={title} onBlur={turnOffEditMode} onChange={changeTitle} autoFocus />
      ) : (
        <span className={className} onDoubleClick={turnOnEditMode}>
          {value}
        </span>
      )}
    </>
  )
}
