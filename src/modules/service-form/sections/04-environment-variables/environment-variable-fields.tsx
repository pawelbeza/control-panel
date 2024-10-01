import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { IconButton, useBreakpoint } from '@koyeb/design-system';
import { useSecrets } from 'src/api/hooks/secret';
import { ControlledInput, ControlledSelect } from 'src/components/controlled';
import { IconTrash } from 'src/components/icons';
import { Translate } from 'src/intl/translate';
import { getId, getName } from 'src/utils/object';

import { defaultServiceForm } from '../../initialize-service-form';
import { ServiceForm } from '../../service-form.types';
import { useWatchServiceForm } from '../../use-service-form';

import { EnvironmentVariableValueField } from './environment-variable-value-field';

const T = Translate.prefix('serviceForm.environmentVariables');

type EnvironmentVariableFieldsProps = {
  index: number;
  onRemove: () => void;
  onCreateSecret: () => void;
};

export function EnvironmentVariableFields({
  index,
  onRemove,
  onCreateSecret,
}: EnvironmentVariableFieldsProps) {
  const variables = useWatchServiceForm(`environmentVariables`);
  const type = variables[index]?.type;
  const { setValue } = useFormContext<ServiceForm>();

  const isMobile = !useBreakpoint('md');
  const showLabel = isMobile || index === 0;

  const handleRemove = () => {
    if (variables.length === 1) {
      setValue(`environmentVariables.${index}`, defaultServiceForm().environmentVariables[0]!);
    } else {
      onRemove();
    }
  };

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="grid grid-cols-1 gap-4 rounded border px-6 py-5 md:grid-cols-[1fr_1fr_1fr_auto] md:border-none md:p-0">
      <ControlledInput<ServiceForm>
        name={`environmentVariables.${index}.name`}
        type="text"
        label={showLabel && <T id="nameLabel" />}
        className="w-full"
      />

      <ControlledSelect<ServiceForm, `environmentVariables.${number}.type`>
        name={`environmentVariables.${index}.type`}
        label={showLabel && <T id="typeLabel" />}
        items={['plaintext', 'secret']}
        getKey={(type) => type ?? 'plaintext'}
        itemToString={(type) => type ?? 'plaintext'}
        itemToValue={(type) => type ?? 'plaintext'}
        renderItem={(type) =>
          ({
            plaintext: <T id="plaintext" />,
            secret: <T id="secret" />,
          })[type ?? 'plaintext']
        }
        onChangeEffect={() => setValue(`environmentVariables.${index}.value`, '')}
      />

      {type === 'plaintext' && (
        <EnvironmentVariableValueField
          index={index}
          onCreateSecret={onCreateSecret}
          label={showLabel && <T id="valueLabel" />}
        />
      )}

      {type === 'secret' && (
        <SecretSelect showLabel={showLabel} index={index} onCreateSecret={onCreateSecret} />
      )}

      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className={clsx(!isMobile && showLabel && 'mt-[1.625rem]')}>
        <IconButton color="gray" Icon={IconTrash} onClick={handleRemove}>
          <T id="deleteVariable" />
        </IconButton>
      </div>
    </div>
  );
}

type SecretSelectProps = {
  showLabel: boolean;
  index: number;
  onCreateSecret: () => void;
};

function SecretSelect({ showLabel, index, onCreateSecret }: SecretSelectProps) {
  const secrets = useSecrets('simple');

  return (
    <ControlledSelect
      name={`environmentVariables.${index}.value`}
      items={secrets ?? []}
      label={showLabel && <T id="secretLabel" />}
      getKey={getId}
      itemToString={getName}
      itemToValue={getName}
      renderItem={getName}
      renderCreateItem={() => <T id="createSecret" />}
      onCreateItem={onCreateSecret}
    />
  );
}
