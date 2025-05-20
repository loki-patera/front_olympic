import { render, screen } from '@testing-library/react'
import { CustomSelect } from '../../../../app/components/shared/CustomSelect'

describe('Composant CustomSelect', () => {

  // Liste d'options de test
  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' }
  ]

  // Fonction pour obtenir la clé de l'option
  const getOptionKey = (option: { id: number }) => option.id
  // Fonction pour obtenir l'étiquette de l'option
  const getOptionLabel = (option: { name: string }) => option.name

  it("affiche le label et le label par défaut", () => {

    // Rendu du composant avec le label et le label par défaut
    render(
      <CustomSelect
        label="Mon label"
        defaultLabel="Sélectionnez une option"
        options={options}
        selected={null}
        onChange={jest.fn()}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
      />
    )

    // Vérifie que le label et le label par défaut sont présents dans le document
    expect(screen.getByText('Mon label')).toBeInTheDocument()
    expect(screen.getByText('Sélectionnez une option')).toBeInTheDocument()
  })

  it("affiche la valeur sélectionnée", () => {

    // Rendu du composant avec une option sélectionnée
    render(
      <CustomSelect
        label="Label"
        defaultLabel="Sélectionnez"
        options={options}
        selected={options[1]}
        onChange={jest.fn()}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
      />
    )

    // Vérifie que l'option sélectionnée est affichée
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it("désactive la liste déroulante si disabled=true", () => {

    // Rendu du composant avec la propriété disabled
    render(
      <CustomSelect
        label="Label"
        defaultLabel="Sélectionnez"
        options={options}
        selected={null}
        onChange={jest.fn()}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
        disabled
      />
    )

    // Récupère la liste déroulante par son rôle
    const button = screen.getByRole('button')

    // Vérifie que la liste déroulante est désactivée
    expect(button).toBeDisabled()

    // Vérifie que les classes CSS pour le style désactivé sont présentes
    expect(button.className).toMatch(/opacity-50/)
    expect(button.className).toMatch(/cursor-not-allowed/)
  })
})