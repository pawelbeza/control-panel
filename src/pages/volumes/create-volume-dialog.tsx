import { Button, Dialog } from '@koyeb/design-system';
import { useVolumes } from 'src/api/hooks/volume';
import { VolumeSnapshot } from 'src/api/model';
import { Translate } from 'src/intl/translate';
import { hasProperty } from 'src/utils/object';

import { VolumeForm } from './volume-form';

const T = Translate.prefix('volumes.createDialog');

type CreateVolumeDialogProps = {
  open: boolean;
  onClose: () => void;
  snapshot?: VolumeSnapshot;
};

export function CreateVolumeDialog({ open, onClose, snapshot }: CreateVolumeDialogProps) {
  const volume = useVolumes()?.find(hasProperty('id', snapshot?.volumeId));

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      title={<T id="title" />}
      description={<T id="description" />}
      width="lg"
    >
      <VolumeForm
        snapshot={snapshot}
        size={volume?.size}
        onSubmitted={() => onClose()}
        renderFooter={(formState) => (
          <footer className="row mt-2 justify-end gap-2">
            <Button variant="ghost" color="gray" onClick={onClose}>
              <Translate id="common.cancel" />
            </Button>

            <Button type="submit" loading={formState.isSubmitting} autoFocus>
              <Translate id="common.create" />
            </Button>
          </footer>
        )}
      />
    </Dialog>
  );
}
