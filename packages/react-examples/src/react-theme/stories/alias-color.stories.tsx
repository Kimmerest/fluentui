import * as React from 'react';
import Color from 'color';

import { ColorRampItem } from '../components/ColorRamp';
import { StorybookStoryContext } from '../../../types';

export default {
  title: 'Fluent UI Theme/Alias/Colors',
};

const buttonStyle = ({ active }: { active: boolean }): React.CSSProperties => ({
  position: 'relative',
  verticalAlign: 'middle',
  padding: 0,
  margin: 0,
  width: 40,
  height: 40,
  border: 'none',
  boxShadow: active ? '0 0 0 1px white, 0 0 0 2px black' : 'none',
  borderRadius: 0,
  outline: 'none ',
  zIndex: active ? 2 : 1,
});

const ColorButton = ({
  style = {},
  color,
  active,
  setPreviewColor,
  setColor,
  ...rest
}: {
  style: React.CSSProperties;
  color: string;
  active: boolean;
  setPreviewColor: (color: string) => null;
  setColor: (color: string) => null;
}) => (
  <button
    style={{
      ...style,
      ...buttonStyle({ active }),
    }}
    onClick={() => {
      setColor(color);
      setPreviewColor(null);
    }}
    onMouseEnter={() => setPreviewColor(color)}
    onMouseLeave={() => setPreviewColor(null)}
    {...rest}
  />
);

export const Colors = (args: object, { globals: { theme } }: StorybookStoryContext) => {
  const [color, setColor] = React.useState<string>('neutral');
  const [previewColor, setPreviewColor] = React.useState<string>(null);

  const COLUMN_WIDTH = 250;
  const activeColor = previewColor || color;

  return (
    <>
      <div>
        <h2 style={{ color: previewColor ? '#888' : '#000' }}>{activeColor}</h2>
        <ColorButton
          color="neutral"
          active={color === 'neutral'}
          setColor={setColor}
          setPreviewColor={setPreviewColor}
          style={{
            background: theme.dark.alias.color.neutral.neutralBackground1,
            color: theme.dark.alias.color.neutral.neutralForeground1,
          }}
        />
        <ColorButton color="ghost" active={color === 'ghost'} setColor={setColor} setPreviewColor={setPreviewColor}>
          G
        </ColorButton>
        <ColorButton
          color="transparent"
          active={color === 'transparent'}
          setColor={setColor}
          setPreviewColor={setPreviewColor}
        >
          T
        </ColorButton>
        <ColorButton
          color="brand"
          active={color === 'brand'}
          setColor={setColor}
          setPreviewColor={setPreviewColor}
          style={{
            background: theme.light.global.palette['brand'].primary, // broken typing
            color:
              theme.light.global.palette['brand'][
                Color(theme.light.global.palette['brand'].primary).isDark() ? 'tint60' : 'shade50'
              ],
          }}
        >
          B
        </ColorButton>
        {Object.keys(theme.light.global.palette)
          // TODO: We iterate global.palette to show color swatches.
          //       The selected swatch then is used to populate the alias grid.
          //       But, global.palette has 'grey' and there is no alias.color.grey so it throws.
          //       Filtering grey out here, but this means our structure is wrong.
          .filter(key => key !== 'grey' && key !== 'brand')
          .map(colorName => (
            <ColorButton
              key={colorName}
              color={colorName}
              active={color === colorName}
              setColor={setColor}
              setPreviewColor={setPreviewColor}
              style={{
                background: theme.light.global.palette[colorName].primary, // broken typing
                color:
                  theme.light.global.palette[colorName][
                    Color(theme.light.global.palette[colorName].primary).isDark() ? 'tint60' : 'shade50'
                  ],
              }}
            />
          ))}
      </div>

      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Design Token</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Light</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Dark</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web High Contrast</h3>
        </div>
        {Object.keys(theme.light.alias.color[activeColor]).map(name => (
          <div key={name} style={{ display: 'flex' }}>
            <div style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', fontWeight: 'bold' }}>{name}</div>
            <ColorRampItem value={theme.light.alias.color[activeColor][name]} />
            <ColorRampItem value={theme.dark.alias.color[activeColor][name]} />
            <ColorRampItem value={theme.highContrast.alias.color[activeColor][name]} />
          </div>
        ))}
      </div>
    </>
  );
};

Colors.args = {};
