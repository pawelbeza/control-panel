import { useState } from 'react';

import { DeployToKoyebButton } from 'src/components/deploy-to-koyeb-button';
import { ServiceEstimatedCost } from 'src/components/service-estimated-cost';
import { useSearchParam } from 'src/hooks/router';
import { ServiceCost } from 'src/modules/service-form/helpers/estimated-cost';
import { ServiceForm } from 'src/modules/service-form/service-form';

import { Tips } from './tips';

export function ReviewStep({ onNext }: { onNext: (serviceId: string) => void }) {
  const [appId] = useSearchParam('appId');
  const [cost, setCost] = useState<ServiceCost>();
  const [deployUrl, setDeployUrl] = useState<string>();

  return (
    <div className="col xl:row gap-8">
      <ServiceForm
        appId={appId ?? undefined}
        className="grow"
        onDeployed={(appId, serviceId) => onNext(serviceId)}
        onCostChanged={setCost}
        onDeployUrlChanged={setDeployUrl}
      />

      <div className="col max-w-sm shrink-0 gap-8 xl:basis-80">
        <Tips />
        <ServiceEstimatedCost cost={cost} />
        <DeployToKoyebButton deployUrl={deployUrl} />
      </div>
    </div>
  );
}
