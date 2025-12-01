import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

export default function ClinicalInfoSection({
  title,
  open,
  setOpen,
  items,
  setItems,
  addItem,
  removeItem,
  newInput,
  setNewInput,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {open ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-200 p-5 bg-gray-50">
          <div className="space-y-3 mb-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma informação cadastrada
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                >
                  <span className="text-sm text-gray-700">{item}</span>
                  <button
                    onClick={() => removeItem(setItems, items, index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' &&
                addItem(setItems, items, newInput, setNewInput)
              }
              placeholder="Escreva aqui..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={() => addItem(setItems, items, newInput, setNewInput)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
