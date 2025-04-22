export const STORY_CATEGORIES: Record<string, string> = {
    DAILY: "일상",
    TRAVEL: "여행",
    FOOD: "맛집",
    HOBBY: "취미",
    CULTURE: "문화/예술",
    SPORTS: "스포츠",
    STUDY: "학습",
    WORK: "업무",
    OTHER: "기타",
    ETC: "기타",
}

// 카테고리 코드를 레이블로 변환하는 헬퍼 함수
export const getStoryCategoryLabel = (categoryValue: string): string => {
    const key = categoryValue.toUpperCase();
    return STORY_CATEGORIES[key] || categoryValue;
};