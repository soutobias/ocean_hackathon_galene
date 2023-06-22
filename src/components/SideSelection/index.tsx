import { SideSelectionContainer, SideSelectionLink } from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faLayerGroup } from '@fortawesome/free-solid-svg-icons'

// interface SideSelectionProps {
// }

export function SideSelection() {
  return (
    <div>
      <SideSelectionContainer>
        <SideSelectionLink title={'Add Layers'} id={'Data Exploration'}>
          <FontAwesomeIcon icon={faLayerGroup} />
        </SideSelectionLink>
        <SideSelectionLink title={'Add Layers'} id={'Data Exploration'}>
          <FontAwesomeIcon icon={faChartLine} />
        </SideSelectionLink>
        <img src="favicon_galene.png" className="absolute bottom-7 h-10" />
      </SideSelectionContainer>
    </div>
  )
}
