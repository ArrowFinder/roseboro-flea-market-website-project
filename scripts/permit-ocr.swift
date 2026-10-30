// Local preview adapter: stdin document bytes; stdout JSON. Never writes documents to disk.
import Foundation
import Vision
import AppKit
import PDFKit

func recognize(_ image: CGImage) throws -> String {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en-US"]
    request.usesLanguageCorrection = false
    try VNImageRequestHandler(cgImage: image).perform([request])
    return (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
}
do {
    let bytes = FileHandle.standardInput.readDataToEndOfFile()
    var text = ""
    if bytes.starts(with: Data("%PDF-".utf8)) {
        guard let pdf = PDFDocument(data: bytes), !pdf.isLocked, pdf.pageCount > 0, pdf.pageCount <= 5 else { throw NSError(domain: "document", code: 1) }
        for index in 0..<pdf.pageCount {
            guard let page = pdf.page(at: index) else { continue }
            let image = page.thumbnail(of: NSSize(width: 2000, height: 2600), for: .mediaBox)
            guard let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
            text += try recognize(cg) + "\n"
        }
    } else {
        guard let source = CGImageSourceCreateWithData(bytes as CFData, nil),
              let image = CGImageSourceCreateThumbnailAtIndex(source, 0, [kCGImageSourceCreateThumbnailFromImageAlways: true, kCGImageSourceThumbnailMaxPixelSize: 2600, kCGImageSourceCreateThumbnailWithTransform: true] as CFDictionary) else { throw NSError(domain: "document", code: 2) }
        text = try recognize(image)
    }
    let result = try JSONSerialization.data(withJSONObject: ["text": String(text.prefix(30000))])
    FileHandle.standardOutput.write(result)
} catch {
    // Intentionally omit document text, filenames and framework errors from logs.
    exit(1)
}
