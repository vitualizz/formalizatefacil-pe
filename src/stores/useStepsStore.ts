import { create } from 'zustand'
import { type StepFormalization } from '@/domain/entities/Merchant'
import { initialFormalizationSteps } from '@/domain/services/formalizationService'

interface StepsStore {
  formalizationSteps: StepFormalization[]
  toggleFormalizationStep: (stepId: string) => void
  resetFormalizationSteps: () => void
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  formalizationSteps: initialFormalizationSteps,
  toggleFormalizationStep: (stepId: string) => set((state) => ({
    formalizationSteps: state.formalizationSteps.map(step => {
      if (Number(step.id) === Number(stepId)) {
        return { ...step, completed: !step.completed };
      }
      return step;
    })
  })),
  resetFormalizationSteps: () => {
    set({ formalizationSteps: initialFormalizationSteps });
  }
}))
