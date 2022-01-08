export default function formatToday() {
  return new Date()
    .toLocaleDateString('cs-cz', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/ /g, '')
    ;
}
