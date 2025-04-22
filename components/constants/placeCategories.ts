// 장소 카테고리 코드와 표시 이름 매핑
export const PLACE_CATEGORIES = [
    { value: "restaurant", label: "음식점" },
    { value: "cafe", label: "카페" },
    { value: "accommodation", label: "숙박" },
    { value: "attraction", label: "관광명소" },
    { value: "shopping", label: "쇼핑" },
    { value: "culture", label: "문화/공연" },
    { value: "transport", label: "교통" },
    { value: "other", label: "기타" },
  ];
  
  // 카테고리 코드를 레이블로 변환하는 헬퍼 함수
  export const getPlaceCategoryLabel = (categoryValue: string): string => {
    const category = PLACE_CATEGORIES.find(cat => cat.value === categoryValue.toLocaleLowerCase());
    return category ? category.label : categoryValue;
  };
  