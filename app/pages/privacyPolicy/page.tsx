/**
 * Composant `PrivacyPolicy` pour afficher la page de politique de confidentialité de l'application
 *
 */

export default function PrivacyPolicy(): React.JSX.Element {

  return (

    <main className="mx-auto max-w-6xl py-8 px-6 sm:px-12">
      <div className="legal space-y-4 text-gray-600">
        <h1 className="text-center text-4xl text-gray-900 py-6">
          Politique de confidentialité
        </h1>
        
        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          1. Informations générales
        </h2>
        <p>
          Nom de l’entreprise : <strong>Billetterie des JO</strong>
          </p>
        <p>
          Forme juridique : <strong><abbr title="Société par Actions Simplifiée">SAS</abbr></strong>
          </p>
        <p>
          Adresse : <strong>1 rue de la Billetterie</strong>
        </p>
        <p>
          Email de contact : <a href="mailto:billetterie-jo@exemple.com">billetterie-jo@exemple.com</a>
        </p>
        <p>
          Téléphone : <strong>+33 1 00 00 00 00</strong>
        </p>
        <p>
          Responsable du traitement des données : <strong>John Doe</strong>
        </p>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          2. Finalités du traitement des données
        </h2>
        <p>
          Gestion des réservations de e-tickets pour assister à des évènements sportifs
        </p>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          3. Services nécessitant la collecte de données
        </h2>
        <p>
          Les données collectées servent à la création de compte pour les clients, à la réservation de e-tickets pour assister à des évènements 
          sportifs et pour le contrôle des e-tickets à l'entrée des lieux où se déroulent les évènements.
        </p>
        
        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          4. Base légale du traitement
        </h2>
        <p>
          Notre collecte de données repose sur la base légale suivante : <strong>Consentement</strong>.
        </p>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          5. Partage des informations avec des tiers
        </h2>
        <p>
          Les données ne sont pas partagées avec des tiers.
        </p>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          6. Durée de conservation des données
        </h2>
        <p>
          Les données sont conservées jusqu'à six mois après la date de l'évènement réservé.
        </p>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          7. Droits des utilisateurs
        </h2>
        <p>
          Conformément au <abbr title="Règlement Général sur la Protection des Données">RGPD</abbr>, les utilisateurs disposent des droits suivants :
        </p>
        <ul className="list-disc pl-8 text-gray-800 font-medium">
          <li>
            Droit d’accès, de rectification, de suppression
          </li>
          <li>
            Droit à la portabilité des données
          </li>
          <li>
            Droit à l’opposition et à la limitation du traitement
          </li>
          <li>
            Droit de retirer le consentement à tout moment
          </li>
          <li>
            Droit d’introduire une réclamation auprès de la <abbr
            title="Commission Nationale de l’Informatique et des Libertés">CNIL</abbr>
          </li>
        </ul>

        <h2 className="text-2xl text-gray-800 underline underline-offset-8 py-4">
          8. Contact
        </h2>
        <p>
          Pour toute question concernant la protection des données, vous pouvez nous contacter à <a href="mailto:billetterie-jo@exemple.com">
          billetterie-jo@exemple.com</a>.
        </p>
      </div>
    </main>
  )
}