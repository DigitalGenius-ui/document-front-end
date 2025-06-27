import { ReactRenderer } from "@tiptap/react";
import MentionList from "./MentionList";
import type { SuggestionProps } from "@tiptap/suggestion";
import tippy, { type Instance } from "tippy.js";

type MentionListRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

export const suggestion = {
  render: () => {
    let component: ReactRenderer<MentionListRef>;
    let popup: Instance[];

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(),
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },
      onUpdate(props: SuggestionProps) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(),
        });
      },
      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown?.(props) ?? false;
      },

      onExit() {
        component.destroy();
      },
    };
  },
};
