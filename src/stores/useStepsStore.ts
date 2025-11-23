import { create } from 'zustand'
import { type StepFormalization } from '@/domain/entities/Merchant'
import { initialFormalizationSteps } from '@/domain/services/formalizationService'

interface StepsStore {
  formalizationSteps: StepFormalization[]
  toggleFormalizationStep: (stepId: string) => void
  resetFormalizationSteps: () => void
  getPercentCompleted: () => number
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  formalizationSteps: initialFormalizationSteps,
  toggleFormalizationStep: (stepId: string) => set((state) => ({
    formalizationSteps: state.formalizationSteps.map(step => {
      if (step.id === stepId) {
        return { ...step, completed: !step.completed };
      }
      return step;
    })
  })),
  resetFormalizationSteps: () => {
    set({ formalizationSteps: initialFormalizationSteps });
  },
  getPercentCompleted: () => {
    const { formalizationSteps: steps } = get();
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / steps.length) * 100);
  }
}))
