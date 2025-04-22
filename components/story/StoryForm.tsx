"use client"

import { Form, Input, DatePicker, Select, Button } from "antd"
import dayjs from "dayjs"
import type { FormInstance } from "antd/es/form"

const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

export const STORY_CATEGORIES = [
  { value: "travel", label: "여행" },
  { value: "food", label: "맛집" },
  { value: "daily", label: "일상" },
  { value: "activity", label: "활동" },
  { value: "culture", label: "문화/예술" },
]

export interface StoryFormValues {
  title: string
  description: string
  dateRange: [dayjs.Dayjs, dayjs.Dayjs]
  category: string
}

interface StoryFormProps {
  form: FormInstance
  onFinish: (values: StoryFormValues) => void
  loading?: boolean
  initialValues?: Partial<StoryFormValues>
}

export default function StoryForm({ form, onFinish, loading = false, initialValues }: StoryFormProps) {
  const defaultValues = {
    dateRange: [dayjs(), dayjs()],
    category: "daily",
    ...initialValues,
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={defaultValues}>
      <Form.Item name="title" label="제목" rules={[{ required: true, message: "제목을 입력해주세요!" }]}>
        <Input placeholder="일상의 제목을 입력하세요" />
      </Form.Item>

      <Form.Item name="description" label="설명" rules={[{ required: true, message: "설명을 입력해주세요!" }]}>
        <TextArea rows={4} placeholder="일상에 대한 설명을 입력하세요" />
      </Form.Item>

      <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item
          name="dateRange"
          label="기간"
          rules={[{ required: true, message: "기간을 선택해주세요!" }]}
          style={{ flex: 1 }}
        >
          <RangePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="카테고리"
          rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
          style={{ flex: 1 }}
        >
          <Select placeholder="카테고리 선택">
            {STORY_CATEGORIES.map((category) => (
              <Option key={category.value} value={category.value}>
                {category.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          일상 기록 생성하기
        </Button>
      </Form.Item>
    </Form>
  )
}

