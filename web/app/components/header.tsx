import Image from "next/image"
import logo from "../../public/logoIFSCHeader.png"

export function Header() {
  return (
    <div className="d-flex grow p-2 justify-between bg-green-700">
      <div>
        <Image 
          src={logo}
          alt="Logo do IFSC"
          height={50}
        />
      </div>
    </div>
  )
}