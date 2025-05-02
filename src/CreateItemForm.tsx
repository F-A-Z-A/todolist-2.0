import { Button } from "./Button.tsx"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
  buttonTitle: string
  onCreateItem: (value: string) => void
}
export const CreateItemForm = ({ buttonTitle, onCreateItem }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if (error) setError(null)
  }

  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createItemHandler()
    }
  }

  return (
    <div>
      <input
        className={error ? "error" : undefined}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button title={buttonTitle} onClick={createItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  )
}
