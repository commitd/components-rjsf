import { Button, Column, Text } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useRef,
  useState,
} from 'react'
const { dataURItoBlob } = utils

type FileData = Pick<Blob, 'size' | 'type'> & { name: string; dataURL?: string }

function addNameToDataURL(dataURL: string, name: string): string {
  return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`)
}

function processFile(file: File): Promise<FileData> {
  const { name, size, type } = file
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.onerror = reject
    reader.onload = (event) => {
      resolve({
        dataURL: addNameToDataURL(event?.target?.result as string, name),
        name,
        size,
        type,
      })
    }
    reader.readAsDataURL(file)
  })
}

function processFiles(files: FileList | null): Promise<FileData[]> {
  return Promise.all(Array.from(files || []).map(processFile))
}

interface FileInfoProps {
  filesInfo: FileData[]
}

const FilesInfo: FC<FileInfoProps> = (props) => {
  const { filesInfo } = props
  if (filesInfo.length === 0) {
    return null
  }
  return (
    <ul className="file-info">
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo
        return (
          <li key={key}>
            <Text>
              <Text weight="bold">{name}</Text> ({type}, {size} bytes)
            </Text>
          </li>
        )
      })}
    </ul>
  )
}

function extractFileInfo(dataURLs: string[]) {
  return dataURLs
    .filter((dataURL) => typeof dataURL !== 'undefined')
    .map((dataURL) => {
      const { blob, name } = dataURItoBlob(dataURL)
      return {
        name: name,
        size: blob.size,
        type: blob.type,
      }
    })
}

export const FileWidget: FC<WidgetProps> = (props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [filesInfo, setFilesInfo] = useState(() =>
    extractFileInfo(
      (Array.isArray(props.value) ? props.value : [props.value]) as string[]
    )
  )

  const { multiple, onChange, id, readonly, disabled, options } = props

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    void processFiles(event.target.files).then((filesInfo) => {
      const newValues = filesInfo.map(
        (fileInfo) => fileInfo.dataURL
      ) as string[]
      setFilesInfo(filesInfo)

      if (multiple) {
        onChange(newValues)
      } else {
        onChange(newValues[0])
      }
    })
    return
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    hiddenFileInput?.current?.click()
  }

  return (
    <Column gap>
      <Button disabled={readonly || disabled} onClick={handleClick}>
        {multiple ? 'Choose files' : 'Choose file'}
      </Button>
      <input
        ref={hiddenFileInput}
        id={id}
        type="file"
        disabled={readonly || disabled}
        onChange={handleChange}
        defaultValue=""
        style={{ display: 'none' }}
        multiple={multiple}
        accept={(options.accept as string) || undefined}
      />
      <FilesInfo filesInfo={filesInfo} />
    </Column>
  )
}
