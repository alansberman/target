import useTargetWordsSimple from "./useTargetWordsSimple";

const useChosenWordSimple = () => {
  const randomIndex = Math.floor(
    Math.random() * useTargetWordsSimple().length - 1
  );
  return useTargetWordsSimple()[randomIndex];
};

export default useChosenWordSimple;
