import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);


    function next() {

        setCurrentStepIndex(prev => {
            if (prev >= steps.length - 1) return prev
            return prev + 1;
        })
    }
    function back() {
        setCurrentStepIndex(prev => {
            if (prev <= 0) return prev
            return prev - 1;
        })
    }


    function goTo(index: number) {
        setCurrentStepIndex(index);
    }
    return {
        steps,
        currentStepIndex,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex == 0,
        isLastStep: currentStepIndex == steps.length - 1,
        goTo,
        next,
        back
    }
}