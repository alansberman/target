import useTargetWords from "./useTargetWords";

const useChosenWord = () => {
  const randomIndex = Math.floor(Math.random() * useTargetWords().length - 1);
  return useTargetWords()[randomIndex];
};

export default useChosenWord;
