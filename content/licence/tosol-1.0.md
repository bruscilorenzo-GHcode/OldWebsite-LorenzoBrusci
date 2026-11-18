# TIMET OPEN SOUND OBJECT LICENCE v1.0

**TOSOL-1.0** — https://timet.org/open-database/licence

Copyright (c) Timet / Lorenzo Brusci. All rights reserved except as expressly granted below.

This licence applies to every sound object, audio file, waveform, metadata record, and
dataset published by Timet as part of the Timet Open Sound Database, unless a specific
record states otherwise.

---

## 1. Purpose

Timet has published individual sound objects as separable intellectual objects since 1993.
This licence continues that practice. It grants generously what belongs in the commons —
listening, study, teaching, non-commercial creation — and reserves, explicitly and in
machine-readable form, what does not.

---

## 2. Definitions

**"Object"** means any single sound recording, audio element, electronic partiture,
waveform, or metadata record distributed under this licence.

**"Database"** means the Timet Open Sound Database as a whole, including its manifests,
`dataset.json`, `dataset.csv`, and any derived index.

**"Non-commercial"** means not primarily intended for or directed toward commercial
advantage or monetary compensation. Internal use by a commercial entity for evaluation,
research, or teaching without direct commercial exploitation of the Object is
non-commercial; use in a product, service, advertisement, or paid performance is not.

**"Commercial use"** means any use primarily intended for or directed toward commercial
advantage or monetary compensation, including but not limited to commercial release,
advertising, branding, paid installation, or paid performance.

**"Text and data mining"** means any automated analytical technique aimed at analysing
text and data in digital form in order to generate information, including patterns,
trends, correlations, and statistical or probabilistic models.

**"Training"** means the use of Objects or the Database, in whole or in part, as input to
train, fine-tune, evaluate, benchmark, or otherwise develop a machine learning or
generative artificial intelligence system of any kind.

**"Research organisation"** has the meaning given in Article 2(1) of Directive
(EU) 2019/790.

---

## 3. Rights granted

Subject to the conditions in Section 5, you may, without fee and worldwide:

**3.1 Listen.** Access, stream, and listen to the Objects privately and publicly,
including in non-commercial public playback contexts.

**3.2 Study and research.** Study, analyse, and computationally process the Objects for
non-commercial research, including text and data mining carried out by a research
organisation for the purposes of scientific research, within the meaning of Article 3 of
Directive (EU) 2019/790.

**3.3 Teach.** Use the Objects in teaching, lectures, workshops, and course material,
non-commercial.

**3.4 Create non-commercially.** Reproduce, adapt, transform, and build upon the Objects
in non-commercial works of any kind, including composition, performance, installation,
film, video, radio, dance, theatre, and software.

**3.5 Redistribute unchanged.** Redistribute unmodified Objects and the unmodified
Database, non-commercial, provided this licence travels with them and attribution is
maintained.

**3.6 Quote.** Quote, cite, and reproduce extracts in criticism, journalism, scholarship,
and documentation, under the ordinary rules of quotation.

---

## 4. Rights reserved

The following require a separate written licence from Timet. They are not granted, and
this licence constitutes an express reservation of them:

**4.1 Commercial use.** Any Commercial use of the Objects, the Database, or works
derived from them.

**4.2 Commercial text and data mining.** Any text and data mining for commercial
purposes.

**4.3 Training.** Any Training of any machine learning or generative artificial
intelligence system, whether commercial or not, using the Objects, the Database, or
any dataset derived from them, in whole or in part.

**4.4 Relicensing.** Re-licensing, sub-licensing, selling, or distributing the Objects
or the Database under terms other than this licence.

**4.5 Bulk mirroring for commercial purposes.** Systematic or bulk downloading,
scraping, or mirroring of the Database for any purpose other than those granted in
Section 3.

**4.6 Marks.** Use of the Timet name, logotype, or marks beyond factual attribution,
including in any way that suggests endorsement.

---

## 5. Conditions

**5.1 Attribution.** You must credit each Object used, in a reasonably visible place:

> Sound object: [title], Timet, [year]. Used under the Timet Open Sound Object
> Licence v1.0. timet.org/open-database/licence

Attribution may not be buried in a colophon, buried in metadata only, or omitted on
grounds of space.

**5.2 Mark modifications.** Adapted or transformed Objects must be identified as
modified, with a short description of the change.

**5.3 Keep the reservation intact.** You must not remove, obscure, or alter any licence
notice, metadata field, HTTP header, or machine-readable statement of reservation
attached to the Objects or the Database.

**5.4 Visitor combinations.** Combinations created by visitors in the recombination
engine are the visitor's own work for non-commercial purposes. Publishing such a
combination commercially, or using it as Training data, still requires a licence from
Timet, and the underlying Objects remain under this licence.

**5.5 No additional restrictions.** You may not apply legal terms or technological
measures that legally restrict others from doing anything this licence permits.

---

## 6. Machine-readable reservation

This licence is an express reservation of rights in machine-readable form pursuant to
Article 4(3) of Directive (EU) 2019/790. The reservation is expressed in all of the
following, and the failure of any one of them does not limit the others:

- `dataset.json` root fields: `"licence": "TOSOL-1.0"`, `"tdm_policy": "reserved"`,
  `"ai_training": "reserved"`
- `dataset.json` and `dataset.csv` per-object field: `"tdm_reservation": "reserved"`
- HTTP response headers on all dataset and audio endpoints:
  `X-TDM-Reservation: reserved`
  `X-Licence: TOSOL-1.0`
  `Link: <https://timet.org/open-database/licence>; rel="license"`
- `robots.txt` directives addressed to automated agents
- The human-readable notice at `/open-database/licence`

---

## 7. Metadata invariants

Every Object record must carry, at minimum:

```
id, title, sourceProject, year, type, instrument, duration, sampleRate,
tags[], licence ("TOSOL-1.0"), tdm_reservation ("reserved"),
checksum, provenance, published (true | false)
```

Records with `published: false` describe material whose master is held in the Timet
archive but is not released. They are metadata only. No audio is served for them.

---

## 8. Provenance

Masters remain in the original Pro Tools and Kyma sessions and are not published. The
Database publishes derived, normalised Objects with documented provenance, alongside
metadata-only entries for held material. What is not available is stated as clearly as
what is.

---

## 9. Term and termination

This licence is granted for the duration of copyright in the Objects. Rights granted
terminate automatically on breach of Section 4 or Section 5. Termination does not affect
works lawfully created before the breach, except that continued distribution requires
compliance.

---

## 10. No warranty

The Objects and the Database are provided as found in the archive, without warranty of
any kind, express or implied, including merchantability, fitness for a particular
purpose, and non-infringement. Timet is not liable for any claim, damage, or other
liability arising from use of the Objects or the Database.

---

## 11. Licensing enquiries

Commercial use, Training, and research uses beyond Section 3 are licensed on request.

**info@musi-co.com** — https://timet.org/contact

We say yes more often than no.

---

## 12. Precedence

If this licence conflicts with any other terms attached to an Object, this licence
prevails for that Object unless the other terms are more permissive.

---

*TOSOL-1.0. Draft pending legal review before publication. Version 1.0, 2026.*

---

# PAGE COPY — /open-database/licence

> **Timet Open Sound Object Licence**
>
> Timet has published individual sound objects since 1993, when we argued that a
> composition could be distributed as its parts as well as its whole. This database
> continues that practice.
>
> You may listen, study, teach, and build non-commercial work with these objects.
> You may not use them commercially, and you may not use them to train artificial
> intelligence systems, without asking us first.
>
> That reservation is deliberate and it is machine-readable. If you want a commercial
> or research licence, write to info@musi-co.com. We say yes more often than no.
>
> **Granted** — listening; study and non-commercial research, including computational
> analysis by research organisations; teaching; non-commercial composition,
> performance, installation, film, radio, theatre and software; redistribution of
> unmodified objects with the licence attached; quotation in criticism and scholarship.
>
> **Reserved** — commercial use; commercial text and data mining; training of any
> machine learning or generative system; relicensing; bulk mirroring for commercial
> purposes; use of the Timet marks beyond factual attribution.
>
> **Attribution** — Sound object: [title], Timet, [year]. Used under TOSOL-1.0.
>
> **Machine-readable** — dataset.json declares `licence: TOSOL-1.0`,
> `tdm_policy: reserved`, and per-object `tdm_reservation: reserved`. Dataset and audio
> endpoints return `X-TDM-Reservation: reserved`. See Article 4(3) of Directive
> (EU) 2019/790.
>
> **Held material** — some entries in the index describe recordings whose masters remain
> in the original Pro Tools and Kyma sessions. They are documented but not published.
>
> Status: pending legal review. Full text: TOSOL-1.0.
