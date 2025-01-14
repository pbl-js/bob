'use client';

import React from 'react';

export function Logger({ val }: { val: any }) {
  console.log(val);
  return <div>Logger</div>;
}
