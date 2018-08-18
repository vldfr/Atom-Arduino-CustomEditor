'use babel';

import AtomArduinoCustomEditorView from './atom-arduino-custom-editor-view';
import { CompositeDisposable } from 'atom';

export default {

  atomArduinoCustomEditorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomArduinoCustomEditorView = new AtomArduinoCustomEditorView(state.atomArduinoCustomEditorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomArduinoCustomEditorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-arduino-custom-editor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomArduinoCustomEditorView.destroy();
  },

  serialize() {
    return {
      atomArduinoCustomEditorViewState: this.atomArduinoCustomEditorView.serialize()
    };
  },

  toggle() {
    console.log('AtomArduinoCustomEditor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
