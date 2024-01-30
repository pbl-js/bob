import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import React from 'react';

// propSchema
// matchComponent
// matchComponentMatchProp

export default function StringPropSchema() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={propSchema.name}>{propSchema.name}</Label>
      <Input
        id={propSchema.name}
        value={matchComponentMatchProp?.type === 'string' ? matchComponentMatchProp.value : ''}
        onBlur={onBlur}
        onChange={(e) =>
          onChange({
            componentId: matchComponent._id,
            newProp: {
              type: 'string',
              name: propSchema.name,
              value: e.target.value,
            },
          })
        }
        type="text"
        placeholder={propSchema.name}
      />
    </div>
  );
}
