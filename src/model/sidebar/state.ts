

export type ISidebarState = Readonly<{
  expanded: boolean;
  visible: boolean;
}>;

export const initialSidebarState: ISidebarState = {
  expanded: false,
  visible: false
};
