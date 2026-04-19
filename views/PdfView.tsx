
import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';

interface PdfViewProps {
  title: string;
  pdfUrl: string;
  onBack: () => void;
}

export const PdfView: React.FC<PdfViewProps> = ({ title, pdfUrl, onBack }) => {
  return (
    <div className="fixed inset-0 z-40 bg-[#F8F9FA] flex flex-col">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-[#86868B] hover:text-black transition-colors rounded-xl hover:bg-gray-50"
            title="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-[13px] tracking-tight text-black">{title}</span>
        </div>
        
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="h-10 text-xs px-4">
            <ExternalLink size={14} className="mr-2" />
            Abrir Externo
          </Button>
        </a>
      </div>

      {/* PDF Iframe */}
      <div className="flex-1 w-full bg-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
          <p className="text-sm text-gray-400 font-medium mb-4">Carregando conteúdo do Protocolo...</p>
          <p className="text-xs text-gray-400 mb-6 max-w-xs">Caso o visualizador não apareça em alguns segundos, clique no botão superior para abrir em uma nova aba.</p>
        </div>
        <iframe 
          src={pdfUrl} 
          className="w-full h-full border-none relative z-10"
          title={title}
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};
