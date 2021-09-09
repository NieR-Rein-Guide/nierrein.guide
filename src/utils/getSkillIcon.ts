export default function getSkillIcon(CategoryId: number, VariationId: number): string {
  const categoryId = CategoryId.toString()
  const variationId = VariationId.toString()
  let id = ''

  if (variationId.length > 1) {
    id = categoryId.padEnd(4, '0') + variationId
  } else {
    id = categoryId.padEnd(5, '0') + variationId
  }

  return `/ui/skill/skill${id}_standard.png`
}