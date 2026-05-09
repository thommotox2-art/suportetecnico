import React from 'react';

const devices = [
  { id: 'INV-1024', name: 'MacBook Pro M2', user: 'Ana Silva', department: 'Design', status: 'Ativo', statusColor: 'bg-primary/10 text-primary border-primary/20' },
  { id: 'INV-1025', name: 'Monitor Dell 27"', user: 'Carlos Souza', department: 'TI', status: 'Manutenção', statusColor: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' },
  { id: 'INV-1026', name: 'Roteador Cisco', user: 'Infraestrutura', department: 'TI', status: 'Inativo', statusColor: 'bg-secondary/10 text-secondary border-secondary/20' },
];

export default function Inventory() {
  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-background">Inventário de Ativos</h2>
          <p className="font-body-md text-body-md text-outline mt-1">Gerenciamento de hardware e equipamentos em uso.</p>
        </div>
        <button className="bg-tertiary text-on-tertiary px-6 py-2.5 rounded hover:bg-tertiary-container transition-colors border border-tertiary/20 flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider shadow-sm w-full sm:w-auto justify-center">
          <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
          ADICIONAR ATIVO
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="p-4 font-label-md text-label-md text-outline uppercase">Código</th>
                <th className="p-4 font-label-md text-label-md text-outline uppercase">Equipamento</th>
                <th className="p-4 font-label-md text-label-md text-outline uppercase">Usuário Responsável</th>
                <th className="p-4 font-label-md text-label-md text-outline uppercase">Departamento</th>
                <th className="p-4 font-label-md text-label-md text-outline uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {devices.map((device, idx) => (
                <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-mono-label text-mono-label text-tertiary">{device.id}</td>
                  <td className="p-4 font-headline-md text-[15px] font-semibold">{device.name}</td>
                  <td className="p-4">{device.user}</td>
                  <td className="p-4">{device.department}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-medium ${device.statusColor}`}>
                      {device.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
