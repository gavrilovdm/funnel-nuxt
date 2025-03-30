export interface TitleProps {
  text: string;
  classes?: string;
}

export interface Option {
  title: string;
  value: string;
}

export interface BaseProps {
  title: TitleProps;
}

export interface SingleChoiceQuestionProps extends BaseProps {
  options: Option[];
}

export interface MultiChoiceQuestionProps extends BaseProps {
  options: Option[];
}

export interface LandingV1Props extends BaseProps {}

export type ComponentProps = SingleChoiceQuestionProps | MultiChoiceQuestionProps | LandingV1Props;

export interface Screen {
  id: string;
  component: 'SingleChoiceQuestion' | 'MultiChoiceQuestion' | 'LandingV1' | 'LandingV2';
  props: ComponentProps;
}

export interface FunnelConfig {
  screens: Screen[];
}

export type FunnelConfigType = 'baseline' | 'experimental'; 