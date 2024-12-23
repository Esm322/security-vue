export default function useClearForm(description: string, title: string, isSended: number): void {
  if (description !== null && title !== null && isSended) {
    setTimeout(() => {
      description = '';
      title = '';
      isSended = 1;
  }, 2000)
  }
}
