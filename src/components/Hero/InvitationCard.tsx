import floralSpray from "@/assets/floral-spray.png";
import floralCorner from "@/assets/floral-corner.png";
import { weddingDetails } from "@/data/weddingDetails";
import { OrnamentDivider } from "@/components/Decor/Ornament";

const { groom, bride, invitationLine, muhurtham, venue, monogram } = weddingDetails;

/** Monogram visible on the card while it is still inside the envelope. */
export function InvitationPeek() {
  return (
    <>
      <span className="peek-label">The Wedding of</span>
      <span className="peek-mono">
        {monogram.first} <span className="text-gold-deep">&amp;</span> {monogram.second}
      </span>
      <OrnamentDivider className="h-[6cqh] w-[46cqw]" />
    </>
  );
}

/** The full invitation revealed once the card has left the envelope. */
export function InvitationFull() {
  const [lead, ...rest] = invitationLine.split(", ");
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-[9cqw] py-[8cqh] text-center">
      <img src={floralCorner} alt="" className="floral-blend absolute -left-[3cqw] -top-[2cqh] w-[34cqw]" />
      <img src={floralCorner} alt="" className="floral-blend absolute -bottom-[2cqh] -right-[3cqw] w-[34cqw] rotate-180" />
      <img src={floralSpray} alt="" className="floral-blend mb-[1.5cqh] w-[52cqw]" />

      <p className="card-label">{lead},</p>
      <p className="card-invite mt-[1cqh] max-w-[70cqw]">{rest.join(", ")}</p>

      <OrnamentDivider className="my-[2.2cqh] h-[3.4cqh] w-[42cqw]" />

      <h1 className="flex flex-col items-center">
        <span className="card-name">{groom.fullName}</span>
        <span className="card-amp text-gold-foil my-[0.6cqh]">&amp;</span>
        <span className="card-name">{bride.fullName}</span>
      </h1>

      <OrnamentDivider className="my-[2.2cqh] h-[3.4cqh] w-[42cqw]" />

      <p className="card-date">
        {muhurtham.dayLabel} · {muhurtham.dateLabel}
      </p>
      <p className="card-small mt-[0.8cqh]">
        Muhurtham at {muhurtham.timeLabel} · {venue.name}
      </p>
    </div>
  );
}
